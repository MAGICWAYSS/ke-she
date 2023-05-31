package com.example.retaildemo.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.retaildemo.beans.History;
import com.example.retaildemo.mapper.HistoryMapper;
import com.example.retaildemo.service.HistoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.retaildemo.vo.PriceImg;
import com.example.retaildemo.vo.TimeImgVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lzp
 * @since 2022-05-07
 */
@Service
public class HistoryServiceImpl extends ServiceImpl<HistoryMapper, History> implements HistoryService {
    @Resource
    private HistoryMapper historyMapper;
    @Override
    public Page<TimeImgVO> history(Integer id, Page<TimeImgVO> page) {
        return historyMapper.history(id,page);
    }
}
