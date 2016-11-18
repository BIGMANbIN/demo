package com.example.web.security;

import com.amaz.core.orm.domain.Page;
import com.example.security.entity.User;
import com.example.security.service.UserService;
import com.example.web.util.DataTablesResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/security/user")
public class UserController {

    @Inject
    private UserService userService;

    @RequestMapping
    public String index(){
        return "security/user/index";
    }

    /**
     * 列表
     * @param request
     * @return
     */
    @RequestMapping(value = "list",method = RequestMethod.GET)
    public DataTablesResult<User> list(HttpServletRequest request) {
        List<User> userList = userService.find();
        String draw = request.getParameter("draw");
        Integer length = Integer.valueOf(request.getParameter("length"));
        Integer start = Integer.valueOf(request.getParameter("start"));
        Page<User> page = new Page<>(length);
        page.setPageNo(start/length +1);
        page.setTotalCount(userList.size());
        page = userService.page(page);
        return new DataTablesResult<>(draw,page.getResult(),page.getTotalCount(),page.getTotalCount());
    }

    /**
     * 到新增页面
     * @return
     */
    @RequestMapping(value = "/new",method = RequestMethod.GET)
    public String _new () {
        return "security/user/new";
    }

    /**
     * 新增保存
     * @param user
     * @return
     * @throws Exception
     */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create (User user) throws Exception {
        userService.save(user);
        return "create";
    }

    /**
     * 到修改页面
     * @return
     */
    @RequestMapping(value = "/{id}/edit",method = RequestMethod.GET)
    public String _edit () {
        return "security/user/edit";
    }

    /**
     * 修改完更新数据
     * @param id
     * @param request
     * @return
     */
    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable long id,HttpServletRequest request) {

        User user = userService.get(id);
        ServletRequestDataBinder binder = new ServletRequestDataBinder(user);
        binder.bind(request);
        userService.save(user);
        return "update";
    }

    /**
     * 删除数据
     * @return
     */
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public String delete (@PathVariable Long id) {
        User user = userService.get(id);
        userService.delete(user);
        return "delete";
    }
}
