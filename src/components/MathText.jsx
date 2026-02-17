import PropTypes from "prop-types";
import { BlockMath, InlineMath } from "react-katex";

export function MathInline({ math }) {
  return <InlineMath math={math} />;
}

MathInline.propTypes = {
  math: PropTypes.string.isRequired
};

export function MathDisplay({ math }) {
  return (
    <div className="math-block">
      <BlockMath math={math} />
    </div>
  );
}

MathDisplay.propTypes = {
  math: PropTypes.string.isRequired
};
