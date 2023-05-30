package com.example.retaildemo.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.ProductComments;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.ProductCommentsVO;

import java.util.List;

/**
 * <p>
 * 商品评价  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface ProductCommentsService extends IService<ProductComments> {
    Page<ProductCommentsVO> showComments(String ProductId,Page<ProductCommentsVO> page);
}
