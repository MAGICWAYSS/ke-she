package com.example.retaildemo.service;

import com.example.retaildemo.beans.Orders;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.ResultVO;

/**
 * <p>
 * 订单  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface OrdersService extends IService<Orders> {
    String addOrder(String cartId, Orders order);

    String queryOrder(String orderNo);

    void checkOrderStatus(String orderNo);

    String tradeCreate(String orderId);
}
