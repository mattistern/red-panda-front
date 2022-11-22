import React from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ProductDataService from '../services/product.service'
import { useEffect } from 'react';

export default function AddItem() {
    useEffect(() => {
        document.title = 'Add Item'
    })

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

 
  //const watchShowImagePreview = watch("image");

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
    ProductDataService.create(data);
  };

  return (
    <div align='center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            name='productName'
            placeholder='Product Name'
            type='text'
            {...register('productName')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fullname?.message}</div>
        </div>

        <div>
          <div>
          <input
            name='productPrice'
            placeholder='Product Price'
            type='text'
            {...register('productPrice')}
            className={`form-control ${errors.productPrice ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.productPrice?.message}</div>
        </div>

        <div>
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

        <div>
          <button type='submit'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

//export default addItem;