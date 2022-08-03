import React from 'react';
import { connect } from 'react-redux';
import { autoLogin } from '../../store/auth';
import { createProduct } from '../../store/products';
// import ProductForm from './ProductForm'

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: 0,
      description: '',
      type: '',
      quantity: 0,
      colour: '',
      imgUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProduct(this.state, this.props.history);
    console.log('CREATE', this.state);
    this.setState({
      title: '',
      price: 0,
      description: '',
      type: '',
      quantity: 0,
      colour: '',
      imgUrl: '',
    });
  }

  render() {
    const { title, price, description, type, quantity, colour, imgUrl } =
      this.state;

    return (
      <div>temp</div>
      // <ProductForm title={title} price={price} description={description} type={type} quantity={quantity} colour={colour} imgUrl={imgUrl} handleChange={this.handleChange} handleSubmit={this.handleSubmit} buttonName={'Create'}/>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token) => dispatch(autoLogin(token)),
    createProduct: (formData, history) =>
      dispatch(createProduct(formData, history)),
  };
};

export default connect(mapState, mapDispatchToProps)(CreateProduct);
