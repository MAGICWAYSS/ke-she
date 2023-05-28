package com.example.retaildemo.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.History;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.PriceImg;
import com.example.retaildemo.vo.TimeImgVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-05-07
 */
public interface HistoryService extends IService<History> {
    Page<TimeImgVO> history(Integer id, Page<TimeImgVO> page) ;
}
