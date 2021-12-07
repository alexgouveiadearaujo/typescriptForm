import { loginRuntime } from "../decorators/loginRuntime.js";

export abstract class View<T> {
  protected element: HTMLElement;
  private escape = false;

  constructor(selector: string, escape?: boolean) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Seletor ${selector} não existe no DOM.`);
    }
    // this.element = document.querySelector(selector);
    if (escape) this.escape = escape;
  }

  protected abstract template(model: T): string;

  @loginRuntime(true)
  public update(model: T): void {
    let template = this.template(model);
    if (this.escape) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    this.element.innerHTML = template;
  }
}
