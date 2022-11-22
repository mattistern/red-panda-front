import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import ProductDataService from '../services/product.service'



export default function EditItem(props) {
    useEffect(() => {
        document.title = 'Edit Item'
    })
    const _id = props._id
    const name = props.name
    const price = props.price
    const category = props.category

    console.log(name, price, category)

    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Product name is required'),
        productPrice: Yup.number()
          .required('Username is required')
          .min(0, 'Price can\'t be less then 0'),
        productCategory: Yup.string()
            .required('Category is required'),
      });

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        ProductDataService.update(_id, data);
      };

    return(
        <div align='center'>
      <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name='productName'
            placeholder={name}
            type="text"
            {...register('productName')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          <div>{errors.fullname?.message}</div>

        
          <div>
          <input
            name='productPrice'
            placeholder={price}
            type='text'
            {...register('productPrice')}
            className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
          />
          </div>
          <div>{errors.productPrice?.message}</div>

            <div>
            <select
                name='productCategory'
                type='text'
                {...register('productCategory')}
                className={`form-control ${errors.productCategory ? 'is-invalid' : ''}`}
            >
                <option value="General Category">General Category</option>
                <option value="Vegetables and fruits">Vegetables and fruits</option>
                <option value="Snacks">Snacks</option>
                <option value="Food products">Food products</option>
                <option value="Drinks">Drinks</option>
                <option value="Disposables">Disposables</option>
                <option value="Housewares">Housewares</option>
                <option value="Cleaners">Cleaners</option>
                <option value="Meat">Meat</option>
                <option value="Dairy">Dairy</option>
            </select>
            </div>

        {/* <div className='form-group'>
            <input
                name='productImage'
                type='file'
                {...register('productImage')}
                {...watch ('productImage')}
            />
        </div> */}


        {/* <div className="form-group">
          <input type="file" {...register("image")} />
          {watchShowImagePreview && (
            <img src={watchShowImagePreview[0].name}/>
          )}
        </div> */}

          <button type='submit'>
            Save
          </button>
      </form>
      </div>
    )
}