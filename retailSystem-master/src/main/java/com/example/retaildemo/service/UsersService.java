package com.example.retaildemo.service;

import com.example.retaildemo.beans.Users;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.retaildemo.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * <p>
 * 用户  服务类
 * </p>
 *
 * @author lzp
 * @since 2022-03-12
 */
public interface UsersService extends IService<Users> {

    ResultVO userResgit(String name, String pwd);

    ResultVO checkLogin(String name, String pwd);

    Users findByName(String name);
    public List<Users> getListByName(@RequestParam String name);

    public List<Users> getListById(@RequestParam Integer id);
}
