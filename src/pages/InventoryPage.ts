import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  get productsHeading() {
    return this.page.getByText('Products', { exact: true });
  }

  get productCards() {
    return this.page.getByRole('button', { name: 'Add to cart', exact: true });
  }
}
