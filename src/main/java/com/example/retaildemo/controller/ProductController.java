package com.example.retaildemo.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.Product;
import com.example.retaildemo.beans.ProductImg;
import com.example.retaildemo.mapper.ProductImgMapper;
import com.example.retaildemo.mapper.ProductMapper;
import com.example.retaildemo.service.ProductService;
import com.example.retaildemo.vo.CategoryVO;
import com.example.retaildemo.vo.PriceImg;
import com.example.retaildemo.vo.ProductVO;
import com.example.retaildemo.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 商品 商品信息相关表：分类表，商品图片表，商品规格表，商品参数表 前端控制器
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
@RestController
@RequestMapping("/retaildemo/products")
@Api(tags = "商品管理")
public class ProductController {
    @Autowired
    ProductService productService;
    @GetMapping("/product/{id}")
    @ApiOperation("通过商品ID查询商品信息")
    public ResultVO getlist(@PathVariable("id") String id){
        ResultVO getlist = productService.getlist(id);
        return getlist;
    }
    @GetMapping("/recommend")
    @ApiOperation("根据销量推荐商品，只显示前四条")
    public List<ProductVO> RecommendThree(){
        List<ProductVO> recommend = productService.recommend();
        return recommend;
    }
    @GetMapping("/CategoryRecommend")
    @ApiOperation("各个分类推荐")
    public List<CategoryVO> CategoryRecommend(){
        return productService.categoryRecommend();
    }
    @GetMapping("/searchCate/{id}")
    @ApiOperation("通过分类ID查询商品")
    public IPage<PriceImg> searchCate(@PathVariable("id") String id, @RequestParam Integer pageNum, @RequestParam Integer pageSize){
        return  productService.getByCategoryId(id, new Page<>(pageNum, pageSize));
    }
    @GetMapping("/searchName")
    @ApiOperation("通过商品名模糊查询商品")
    public IPage<PriceImg> searchName(@RequestParam String keyword, @RequestParam Integer pageNum,
                                      @RequestParam Integer pageSize){
        return  productService.fuzzyQuery(keyword, new Page<>(pageNum, pageSize));
    }
    @PostMapping("/addProduct")
    @ApiOperation("添加商品")
    public String addproduct(@RequestBody Product product){
        productService.save(product);
        return product.getProductId();
    }
}

