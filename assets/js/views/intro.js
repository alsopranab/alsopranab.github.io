import { navigate } from "../core/router.js";

export async function IntroView(container) {
  container.innerHTML = `
    <section class="intro">
      <h1>Pranab Debnath</h1>
      <p>Analytics • Data • Insights</p>
    </section>
  `;

  // Auto transition to dashboard
  setTimeout(() => {
    navigate("dashboard");
  }, 2500);
}
