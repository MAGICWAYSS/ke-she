package com.example.retaildemo.mapper;

import com.example.retaildemo.beans.ProductSku;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 * 商品规格 每一件商品都有不同的规格，不同的规格又有不同的价格和优惠力度，规格表为此设计 Mapper 接口
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface ProductSkuMapper extends BaseMapper<ProductSku> {

}
