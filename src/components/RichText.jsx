import PropTypes from "prop-types";

export default function RichText({ text }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);

  return (
    <div className="rich-text">
      {lines.map((line, index) => {
        if (line.startsWith("- ")) {
          return (
            <p key={`${line}-${index}`} className="list-line">
              • {line.slice(2)}
            </p>
          );
        }
        return <p key={`${line}-${index}`}>{line}</p>;
      })}
    </div>
  );
}

RichText.propTypes = {
  text: PropTypes.string.isRequired
};
