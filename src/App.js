
import React from "react";
import Cart from './Cart';
import Navbar from "./Nav";
import firebase from 'firebase/app';
class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      products : [],
      loading: 'true',
      handleIncreaseQuantity: this.handleIncreaseQuantity.bind(this),
      handleDecreaseQuantity: this.handleDecreaseQuantity.bind(this),
      handleDeleteItem: this.handleDeleteItem.bind(this)

    }
  }
  handleIncreaseQuantity = (product) => {
    console.log('hey pls increase the quantity of',product);
    const{products} = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products
    // });
     
    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty + 1

      })
      .then(() => {
        console.log("Product updated");
      })
      .catch((error) =>{
        console.log("Error",error);
      })
  }
  handleDeleteItem = (id) => {
    const{products} = this.state;
    // const items = products.filter((product) => 
    //   product.id !== id
    // );
    // this.setState({
    //   products: items
    // })
    const docRef = firebase.firestore().collection('products').doc(id);
    docRef
    .delete()
    .then(() => {
      console.log("Deleted Succesfully");
    })
    .catch((error) =>{
      console.log("Error",error)
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('hey pls decrease the quantity of',product);
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products
    // });
    const docRef = firebase.firestore().collection('products').doc(products[index].id)
    docRef.update({
      qty: products[index].qty - 1
    })
    .then(() => {
      console.log('Prouct quantity deleted');
    })
    .catch((error) =>{
      console.log('Error',error);
    })
  }
  getCartCount = () => {
    const {products} = this.state;
    let count =0;
    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  }
  getCartTotal = () =>{
    const {products} = this.state;
    let price = 0;
    products.forEach((product) => {
      price += product.qty * product.price;
    })
    return price;
  }
  componentDidMount(){
    firebase 
    .firestore()
    .collection('products')
    // .get()
    // .then( (snapshot) => {
    .onSnapshot( (snapshot) => {
      console.log(snapshot);
      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });

      this.setState({
        products,
        loading: false
      });
    });

  }
  addProduct = () => {
    firebase
    .firestore()
    .collection('products')
    .add({
      img : '',
      title: 'washing machine',
      price: 99,
      qty: 3
    })
    .then((docRef) => {
      console.log('Added new product', docRef);
    })
    .catch((error) =>{
      console.log('Error',error);
    })
  }
  render(){
    const {products, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteItem , loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct}>Add product</button> */}
        <Cart products = {products}   onIncreaseQuantity= {handleIncreaseQuantity} onDecreaseQuantity = {handleDecreaseQuantity} onDeleteItem = {handleDeleteItem}/>
        {loading && <h1>loading cart items ...</h1>}
        <div style= {{ padding: 10, fontSize: 20 }}>Total: {this.getCartTotal()}</div>
      </div>
      
    );
  }
  }

export default App;
