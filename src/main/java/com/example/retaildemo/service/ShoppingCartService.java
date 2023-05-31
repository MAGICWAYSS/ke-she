package com.example.retaildemo.service;

import com.example.retaildemo.beans.ShoppingCart;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.ResultVO;
import com.example.retaildemo.vo.ShoppingCartVO;

import java.util.List;

/**
 * <p>
 * 购物车  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface ShoppingCartService extends IService<ShoppingCart> {
ResultVO addShoppingCart(ShoppingCart cart);
List<ShoppingCartVO> ShoppingCartList(int userId);
ResultVO updateCartNum(String s,int i);
List<ShoppingCartVO> ShoppingCartByCartId(List<Integer> s);
}
