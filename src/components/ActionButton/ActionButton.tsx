const ButtonProps: Record<ActionButtonType, ActionButtonTypeProps> = {
  clear: {
    title: 'Limpiar',
    icon: 'fas fa-trash',
    className: 'btn btn-danger',
    toolTip: 'Clear result (CtrCmd + l)',
  },
  execute: {
    title: 'Ejecutar',
    icon: 'fas fa-play-circle',
    className: 'btn btn-success',
    toolTip: 'Run Code (CtrCmd + k)',
  },
  history: {
    title: 'Historial',
    icon: 'fas fa-history',
    className: 'btn btn-secondary',
    toolTip: 'Show run history',
  },
};

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  loading = false,
}) => {
  const buttonProps = ButtonProps[type];
  const iconName = loading ? 'fas fa-spinner fa-spin' : buttonProps.icon;
  return (
    <button
      data-toggle="tooltip"
      data-testid={`actionbutton-button-${type}`}
      type="button"
      onClick={onClick}
      className={buttonProps.className}
      disabled={loading}
      title={buttonProps.toolTip}
      style={{ padding: '5px 10px' }}
    >
      <span>{buttonProps.title}</span>
      &nbsp;
      <i data-testid="actionbutton-icon" className={iconName} />
    </button>
  );
};

export default ActionButton;
