"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { AppDispatch } from '../redux/store';
import { setAllVendorsData } from '@/redux/vendorSlice';
import { useDispatch } from 'react-redux';

function UseGetAllVendors() {
    const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    const fetchAllVendor = async () => {
        try {
                const result = await axios.get("/api/vendor/AllVendor")
                dispatch(setAllVendorsData(result.data))
                
        } catch (error) {
            console.log(error);
            dispatch(setAllVendorsData([]))
        }
    }
    fetchAllVendor()

  },[])
}

export default UseGetAllVendors
