import { useContext } from 'react';
import _ from 'lodash';
import { AppContext } from 'context/AppContext';

const Console: React.FC = () => {
  const { state } = useContext(AppContext);
  const { result, error, theme } = state;
  const extraClass = theme === 'vs-light' ? 'console-light' : '';

  const createKey = (index: number) => {
    return `key${index}`;
  };

  if (error) {
    return (
      <div className="console">
        <div data-testid="console-error" className="error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="console-result" className={`console ${extraClass}`}>
      {[...result].reverse().map((item, index) => {
        const consoleItem = !_.isString(item) ? JSON.stringify(item, null, 2) : item;
        const itemClassName = index === 0 ? 'latest-log' : '';
        return (
          <div key={index} className={itemClassName}>
            <pre>
              <span style={{ marginRight: 5 }}>&#8250;</span>
              <span data-testid={`console-result-item-${index}`}>
                {consoleItem}
              </span>
            </pre>
          </div>
        );
      })}
    </div>
  );
};

export default Console;
