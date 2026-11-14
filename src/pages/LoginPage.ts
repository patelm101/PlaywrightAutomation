import { BasePage } from './BasePage';

export interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginPage extends BasePage {
  get loginForm() {
    return this.page.getByRole('form', { name: 'Login' });
  }

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get loginError() {
    return this.page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }
}
