import React from 'react'

import productService from "../services/product.service";
import { useEffect, useState } from "react";
import * as ReactBootStrap from 'react-bootstrap'
import EditItem from './edit.item';


export default function Home() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [inEdit, setInEdit] = useState('')

    const dataFunction = async () => {
    
        try {
            var res = await productService.getAll()
            console.log(res.data)
            setData(res.data)
            // console.log(this.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log('BUILD')
        dataFunction() 
    }, []);

    const goToEdit = (id) => {
      setInEdit(id)
    }

    return loading ? (<ReactBootStrap.Spinner animation="border" />) : (
        <>
          <h1>Products</h1>
          <div>
            
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
                
            </thead>
            {data
              .map((product) => (inEdit === product._id ?
                <EditItem 
                _id={product._id}
                name={product.productName}
                price={product.productPrice}
                category={product.productCategory}
                ></EditItem>               
                :
                <tbody key={product._id}>
                    <tr>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td>{product.productCategory}</td>
                        {/* <td><a href='/edit'>edit</a></td> */}
                        <td>
                          <button onClick={() => goToEdit(product._id)}>Edit</button>
                        </td>
                    </tr>
                </tbody>
              ))}
             </table>
          </div>
        </>
      );
}


