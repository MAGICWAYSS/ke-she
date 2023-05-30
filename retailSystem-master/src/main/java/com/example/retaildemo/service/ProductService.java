package com.example.retaildemo.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.Product;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.CategoryVO;
import com.example.retaildemo.vo.PriceImg;
import com.example.retaildemo.vo.ProductVO;
import com.example.retaildemo.vo.ResultVO;

import java.util.List;

/**
 * <p>
 * 商品 商品信息相关表：分类表，商品图片表，商品规格表，商品参数表 服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface ProductService extends IService<Product> {
    public List<ProductVO> recommend();
    public ResultVO getListById(Integer id);
    public List<ProductVO> getListByName(String name);
    public String delete(Integer id);
    public List<ProductVO> getAllList();

    List<CategoryVO> categoryRecommend();
    Page<PriceImg> getByCategoryId(String id, Page<PriceImg> page);

    Page<PriceImg> fuzzyQuery(String id, Page<PriceImg> page);
}
