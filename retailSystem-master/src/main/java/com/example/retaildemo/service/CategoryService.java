package com.example.retaildemo.service;

import com.example.retaildemo.beans.Category;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.CategoryVO;

import java.util.List;

/**
 * <p>
 * 商品分类 服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface CategoryService extends IService<Category> {
    public List<CategoryVO> categoryAll();
}
