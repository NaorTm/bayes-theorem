import PropTypes from "prop-types";
import { roundTo } from "../../utils/format";

export default function SimulationAgreementPanel({
  label,
  theoretical,
  estimate,
  trials,
  tolerance
}) {
  const error = Math.abs(theoretical - estimate);
  const withinTolerance = error <= tolerance;

  return (
    <section className="sim-agreement" aria-label={`${label} simulation agreement`}>
      <h4>Simulation vs theory</h4>
      <p>
        <strong>{label} (theory)</strong>: {roundTo(theoretical, 4)}
      </p>
      <p>
        <strong>{label} (simulation)</strong>: {roundTo(estimate, 4)} from {trials.toLocaleString()} trials
      </p>
      <p>
        <strong>Absolute error</strong>: {roundTo(error, 4)} (tolerance {roundTo(tolerance, 4)})
      </p>
      <p className={withinTolerance ? "sim-pass" : "sim-fail"}>
        {withinTolerance ? "Agreement: within tolerance" : "Agreement: outside tolerance"}
      </p>
    </section>
  );
}

SimulationAgreementPanel.propTypes = {
  label: PropTypes.string.isRequired,
  theoretical: PropTypes.number.isRequired,
  estimate: PropTypes.number.isRequired,
  trials: PropTypes.number.isRequired,
  tolerance: PropTypes.number
};

SimulationAgreementPanel.defaultProps = {
  tolerance: 0.02
};
