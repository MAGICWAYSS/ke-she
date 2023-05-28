package com.example.retaildemo.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.Product;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.retaildemo.vo.PriceImg;
import com.example.retaildemo.vo.ProductCommentsVO;
import com.example.retaildemo.vo.ProductVO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 商品 商品信息相关表：分类表，商品图片表，商品规格表，商品参数表 Mapper 接口
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface ProductMapper extends BaseMapper<Product> {
    @Select(" select distinct p.product_name,p.product_id,p.sold_num,p.content,p.category_id, i.url,s.sell_price\n" +
            " from product p  INNER JOIN product_img i INNER JOIN product_sku s \n" +
            "            on i.item_id=p.product_id and s.product_id=p.product_id \n" +
            "            where p.category_id=#{categoryId} and i.is_main=1")
List<PriceImg> getByCategoryId(@Param("categoryId") String categoryId, Page<PriceImg> page);
    @Select(" select distinct p.product_name,p.product_id,p.sold_num,p.content,p.category_id, i.url,s.sell_price\n" +
            " from product p  INNER JOIN product_img i INNER JOIN product_sku s \n" +
            "            on i.item_id=p.product_id and s.product_id=p.product_id \n" +
            "            where p.product_name like concat('%',#{keyword},'%') and i.is_main=1")
    List<PriceImg> fuzzyQuery(@Param("keyword") String keyword,Page<PriceImg> page);
}
