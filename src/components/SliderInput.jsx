import PropTypes from "prop-types";

export default function SliderInput({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  display
}) {
  return (
    <label htmlFor={id} className="slider-field">
      <span>
        {label}: <strong>{display ?? value}</strong>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

SliderInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  display: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

SliderInput.defaultProps = {
  display: undefined
};
