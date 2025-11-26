import { Component, Input } from '@angular/core';
import { ProductResponse } from '../../utils/models/models';

@Component({
  selector: 'app-product-card-component',
  standalone: false,
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.scss'
})
export class ProductCardComponent {

  @Input() product: ProductResponse = {} as ProductResponse;
}
