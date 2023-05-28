package com.example.retaildemo.service;

import com.example.retaildemo.beans.OrderItem;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.ResultVO;

/**
 * <p>
 * 订单项/快照  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface OrderItemService extends IService<OrderItem> {
    ResultVO getByOrderId(String s);
    ResultVO getListByUserId(String s);
    boolean updateComment(String id,int status);
}
