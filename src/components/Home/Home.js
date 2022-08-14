import React from "react";
import "./Home.css";
import Product from "../Product/Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="homeImage"
          src="https://wallpaperaccess.com/full/2593063.jpg"
          alt=""
        />
        <div className="home_row">
          <div className="product_row">
            {/* product */}
            {/* product */}
            <Product
              id="1"
              title="Wind/Pinball"
              image="https://th.bing.com/th/id/OIP.E_Xp_u9LKksk7kj3GkOUdwHaLX?pid=ImgDet&rs=1"
              price={100}
              rating={3}
            />
            <Product
              id="2"
              title="Norwegian wood"
              image="https://th.bing.com/th/id/OIP.2UwDcQbb5drhjZh66pO_iAHaLc?w=134&h=207&c=7&r=0&o=5&pid=1.7"
              price={150}
              rating={5}
            />
          </div>
          <div className="product_row">
            {/* product */}
            {/* product */}
            {/* product */}
            <Product
              id="3"
              title="Cruel Prince"
              image="https://writingtheuniverseblog.files.wordpress.com/2018/01/the-cruel-prince-2.jpg"
              price={80}
              rating={4}
            />
            <Product
              id="4"
              title="Ikigai"
              image="https://th.bing.com/th/id/OIP.T_yOpY2hDFnySUQoAcc3jAHaJ5?pid=ImgDet&rs=1"
              price={170}
              rating={4}
            />
            <Product
              id="5"
              title="The Wicked King"
              image="https://th.bing.com/th/id/OIP.ZIZQUGZC9cP50s3-GsG3qQHaLQ?pid=ImgDet&rs=1"
              price={120}
              rating={3}
            />
          </div>
          <div className="product_row">
            {/* product */}
            <Product
              id="6"
              title="The love hypothesis"
              image="https://thebookishlibra.com/wp-content/uploads/2021/04/love-hyp-lg-687x1030.jpg"
              price={90}
              rating={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
