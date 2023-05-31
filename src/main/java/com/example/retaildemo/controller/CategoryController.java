package com.example.retaildemo.controller;


import com.example.retaildemo.service.CategoryService;
import com.example.retaildemo.vo.CategoryVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 商品分类 前端控制器
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
@RestController
@RequestMapping("/retaildemo/category")
@Api(tags = "分类显示")
public class CategoryController {
    @Resource
    private CategoryService categoryService;
    @GetMapping("/categories")
    @ApiOperation("返回所有的一级分类内套二三级")
    public List<CategoryVO> recursionCategories(){
        return categoryService.categoryAll();
    }

}

