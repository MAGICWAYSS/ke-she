package com.example.retaildemo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.retaildemo.beans.ProductParams;
import com.example.retaildemo.mapper.ProductParamsMapper;
import com.example.retaildemo.service.ProductParamsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 * 商品参数  服务实现类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
@Service
public class ProductParamsServiceImpl extends ServiceImpl<ProductParamsMapper, ProductParams> implements ProductParamsService {
    @Resource
    private ProductParamsMapper productParamsMapper;
    @Override
    public ProductParams getById(String s) {
        QueryWrapper<ProductParams> productParamsQueryWrapper = new QueryWrapper<>();
        productParamsQueryWrapper.eq("product_id",s);
        ProductParams productParams = productParamsMapper.selectOne(productParamsQueryWrapper);
        return productParams;
    }
}
