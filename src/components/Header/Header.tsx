import { ChangeEvent, useContext } from 'react';
import ActionButton from 'components/ActionButton';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import { CODE_SAMPLES, EDITOR_THEMES } from 'helpers/const';
import useCodeRunner from 'hooks/useCodeRunner';
import Logo from '../../assets/logo-codexia.png';

const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { runCode } = useCodeRunner();
  const { theme, codeSampleName } = state;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    const { codeSample } = CODE_SAMPLES.find(item => item.name === value)!;

    const payload = {
      codeSample,
      codeSampleName: value,
    };

    dispatch({ type: AppActions.LOAD_CODE_SAMPLE, payload });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-2">
      <div className="d-flex align-items-center text-start">
        <div>
          <img src={Logo} alt="logo" className='img-size py-2' />
        </div>
        <a className="navbar-brand" href="/">
          JS PlayGround
        </a>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                dispatch({
                  type: AppActions.TOGGLE_ABOUT_MODAL,
                  payload: 'block',
                })
              }
            >
              Info
            </button>
          </li>
        </ul>

        <div className="my-2 app-actions">
          <div>
            <select
              data-testid="header-code-selector"
              className="form-control"
              value={codeSampleName}
              onChange={handleChange}
            >
              <option value="" disabled>
                Cargar Ejemplos
              </option>
              {CODE_SAMPLES.map(item => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <span style={{ marginLeft: 20, marginRight: 20 }} />

          <div className="btn-group" role="group">
            {EDITOR_THEMES.map(item => (
              <button
                key={item.id}
                type="button"
                data-testid={`app-theme-button-${item.value}`}
                className={`btn btn-${theme === item.value ? 'warning' : ' default'
                  }`}
                onClick={() => {
                  dispatch({
                    type: AppActions.TOGGLE_THEME,
                    payload: item.value,
                  });
                }}
              >
                <i className={`fas fa-${item.icon}`} />
              </button>
            ))}
          </div>

          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton
            type="clear"
            onClick={() => dispatch({ type: AppActions.CLEAR_RESULT })}
          />

          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton
            type="history"
            onClick={() => dispatch({ type: AppActions.TOGGLE_HISTORY_MODAL })}
          />

          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton
            type="execute"
            onClick={() => runCode(state.code)}
            loading={state.loading}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
