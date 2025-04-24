import { useContext } from 'react';
import { LIBRARIES } from 'helpers/const';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import Modal from 'components/Modal';

const About: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const open = state.display !== 'none';

  const handleClose = () => {
    dispatch({ type: AppActions.TOGGLE_ABOUT_MODAL, payload: 'none' });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} title="Información de JS Playground">
      <p>
        Un entorno interactivo para escribir, probar y ejecutar código JavaScript y TypeScript directamente en tu navegador.
      </p>
      <div>
        Experimenta con fragmentos de código JavaScript y TypeScript en este sandbox. Carga ejemplos, ejecuta y visualiza los resultados al instante.
        {/* <ul data-testid="about-libraries-list">
          {LIBRARIES.map(lib => (
            <li key={lib.name}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <a href={lib.url} target="_blank" rel="noopener noreferrer">
                  {lib.name} <span className="text-sm">v{lib.version}</span>
                </a>
                <span>Use as {lib.use}</span>
              </div>
            </li>
          ))}
        </ul> */}
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className="float-left">
          Desarrollado por {" "}
          <a href="*" target="_blank" rel="noopener noreferrer">
            Codexia
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default About;
