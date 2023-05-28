package com.example.retaildemo.service;

import com.example.retaildemo.beans.IndexImg;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 轮播图  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface IndexImgService extends IService<IndexImg> {
    public List<IndexImg> indexImg();
}
