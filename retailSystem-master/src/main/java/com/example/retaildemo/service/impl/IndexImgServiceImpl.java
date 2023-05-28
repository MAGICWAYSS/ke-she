package com.example.retaildemo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.retaildemo.beans.IndexImg;
import com.example.retaildemo.mapper.IndexImgMapper;
import com.example.retaildemo.service.IndexImgService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 轮播图  服务实现类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
@Service
public class IndexImgServiceImpl extends ServiceImpl<IndexImgMapper, IndexImg> implements IndexImgService {
    @Resource
    IndexImgMapper indexImgMapper;

    @Override
    public List<IndexImg> indexImg(){
        QueryWrapper<IndexImg> wrapper=new QueryWrapper<>();
        wrapper.eq("status","1");
        wrapper.orderByAsc("seq");
        List<IndexImg> indexImgs = indexImgMapper.selectList(wrapper);
        return indexImgs;
    }
}
