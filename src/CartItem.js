import React from "react";

const  CartItem = (props) => {
        const { title, price, qty } = props.product;
        const {product, onDecreaseQuantity,onIncreaseQuantity,onDeleteItem} = props;
        return (
           <div className = "cart-item">
            <div className="left-block">
                <img style= {styles.image} src = {product.img} />
            </div>
            <div className="right-block">
            <div style= { { fontSize: 25 } }>{title}</div>
            <div style= { { color: "#777" } }>Rs {price}</div>
            <div style= { { color: "#777" } }>Qty {qty}</div>
            <div className="cart-item-actions">
                <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992683.png" onClick = { () => {onDecreaseQuantity(product)}}/>
                <img alt="increase" className="action-icons" src="https://cdn-icons.flaticon.com/png/512/3303/premium/3303893.png?token=exp=1646997937~hmac=2efc62670642b758d7a22daeace0ba38" onClick = {() => onIncreaseQuantity(product)}/>
                <img alt="delete" className="action-icons" src="https://cdn-icons.flaticon.com/png/512/2874/premium/2874821.png?token=exp=1646998072~hmac=27dcab33667e9ee5e7c768a8e233bac2" onClick = {() => onDeleteItem(product.id)}/>
            </div>
            </div>
           </div>
        );
    }

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4
    }
}

export default CartItem;