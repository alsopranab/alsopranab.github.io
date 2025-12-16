import { navigate } from "../core/router.js";

export async function IntroView(container) {
  container.innerHTML = `
    <section class="intro">
      <h1>Pranab Debnath</h1>
      <p>Tech • Data • Analytics</p>
    </section>
  `;

  setTimeout(() => navigate("dashboard"), 2500);
}
