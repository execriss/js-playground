// c:\Users\Trabajos\Desktop\example-git\js-playground\src\components\CodeEditor\CodeEditor.tsx
import { useContext, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import useCodeRunner from 'hooks/useCodeRunner';

// --- INICIO: Añadir useRef para el temporizador de debounce ---
const DEBOUNCE_DELAY = 750; // Milisegundos de espera antes de ejecutar
// --- FIN: Añadir useRef para el temporizador de debounce ---

const CodeEditor: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef(null);
  const { runCode } = useCodeRunner();
  // --- INICIO: Añadir useRef para el temporizador de debounce ---
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // --- FIN: Añadir useRef para el temporizador de debounce ---

  const initEditor = () => {
    const editorConfig = {
      value: state.code, // Inicializar con el código actual del estado
      language: 'typescript',
      fontSize: 20,
      theme: state.theme,
      minimap: {
        enabled: false,
      },
    };

    const editorInstance = monaco.editor.create(
      editorRef.current!,
      editorConfig
    );

    monaco.editor.setModelLanguage(editorInstance.getModel()!, 'typescript');

    editorInstance.layout();

    editorInstance.addAction({
      id: 'run-code',
      label: 'Run The Code',
      keybindings: [monaco.KeyMod.CtrlCmd + monaco.KeyCode.KeyK],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => runCode(editorInstance.getValue()),
    });

    editorInstance.addAction({
      id: 'clear-result',
      label: 'Clear Result',
      keybindings: [monaco.KeyMod.CtrlCmd + monaco.KeyCode.KeyL],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => dispatch({ type: AppActions.CLEAR_RESULT }),
    });

    // --- INICIO: Modificar onDidChangeModelContent con Debounce ---
    editorInstance.onDidChangeModelContent(() => {
      // Limpiar el temporizador anterior si existe
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const currentCode = editorInstance.getValue();

      // Actualizar el estado del código inmediatamente (o también puedes ponerlo dentro del timeout si prefieres)
      dispatch({
        type: AppActions.UPDATE_CODE,
        payload: currentCode,
      });

      // Establecer un nuevo temporizador para ejecutar el código después del delay
      debounceTimerRef.current = setTimeout(() => {
        runCode(currentCode);
      }, DEBOUNCE_DELAY);
    });
    // --- FIN: Modificar onDidChangeModelContent con Debounce ---

    // No necesitas establecer el valor aquí si ya lo hiciste en editorConfig
    // editorInstance.setValue(state.code);
    setEditor(editorInstance);
  };

  useEffect(() => {
    if (editorRef.current && !editor) {
      initEditor();
    }

    // --- INICIO: Limpieza del temporizador al desmontar ---
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      editor?.dispose();
    };
    // --- FIN: Limpieza del temporizador al desmontar ---
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef.current]); // Asegúrate de que las dependencias sean correctas, runCode y dispatch suelen ser estables

  useEffect(() => {
    if (editor) { // Asegurarse que el editor existe antes de actualizar
      monaco.editor.setTheme(state.theme); // Usar la API global para cambiar tema
    }
  }, [state.theme, editor]); // Añadir editor como dependencia

  useEffect(() => {
    // Solo actualiza el valor si el código del estado (codeSample)
    // es diferente al valor actual del editor para evitar bucles
    // y perder la posición del cursor.
    if (editor && editor.getValue() !== state.codeSample) {
      editor?.setValue(state.codeSample);
    }
  }, [state.codeSample, editor]); // Añadir editor como dependencia

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};

export default CodeEditor;
