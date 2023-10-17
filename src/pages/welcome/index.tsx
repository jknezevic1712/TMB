import WelcomeTemplate from "@/components/templates/welcome";
// utils
import withAuthGuard from "@/lib/hoc/withAuthGuard";

function WelcomePage() {
  return <WelcomeTemplate />;
}

const WelcomePageWithAuthGuard = withAuthGuard(WelcomePage);
export default WelcomePageWithAuthGuard;
