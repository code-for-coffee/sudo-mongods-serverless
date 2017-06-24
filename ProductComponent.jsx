import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
  /**
   * props: { flavours: ['/path/to/lime.svg', '/path/to/orange.svg'],
   *    name: 'string',
   *    percentageRange: 'string',
   *    symptoms: ['string'],
   *    image: '/path/to/img.jpg',
   *    largeImage: '/path/to/largeImg.jpg'
   * }
   * @param props
   */
  constructor(props) {
    super(props);
  }
  render() {
    let flavours = this.props.flavours.map((svg) =>
      <li><span class='{svg}' /></li>
    );
    let symptoms = this.props.symptoms.map((condition) =>
      <li>{condition}</li>
    );
    return (
      <article>
        <picture>
          <source srcset={this.props.largeImage} media="(min-width: 600px)" />
            <img src={this.props.image} alt={this.props.name} />
        </picture>
        <h3>{this.props.name}</h3>
        <h4>{this.props.percentageRange}</h4>
        <ul>{flavours}</ul>
        <p>This product is recommended for treating:
          <ul>{symptoms}</ul>
        </p>
      </article>
    )
  }
}

export default Product;
