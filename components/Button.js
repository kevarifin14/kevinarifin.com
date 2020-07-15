import { colors } from 'utils';

function Button({ children, onClick, type }) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
      >
        {children}
      </button>

      <style jsx>{`
        button {
          cursor: pointer;
          padding: 0.5em;
          border-radius: 0;
          font-size: 120%;
          background-color: ${colors.blue};
          color: white;
          border: 0;
        }
      `}</style>
    </>
  );
}

export default Button;