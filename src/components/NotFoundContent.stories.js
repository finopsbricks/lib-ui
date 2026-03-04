/**
 * NotFoundContent Stories — User Journey Pattern
 *
 * These stories represent real user scenarios.
 * Each story answers: "When/why does a user see this component in this state?"
 *
 * 404 page content shown when a route is not found.
 *
 * Stories:
 * - WhenPageNotFound: Default 404 state with back-home link
 */
import NotFoundContent from "./NotFoundContent";

export default {
  title: "components/NotFoundContent",
  component: NotFoundContent,
};

export const WhenPageNotFound = {};
