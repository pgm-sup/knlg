package com.wyc.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.wyc.entity.Knowledge;
import com.wyc.entity.Ruler;
import com.wyc.service.KnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author pgm_sup
 */
@Controller
@RequestMapping
public class KnowledgeController {

    private final KnowledgeService knowledgeService;

    @Autowired
    public KnowledgeController(KnowledgeService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("role")
    public String role(){
        return "role";
    }

    @RequestMapping("edit")
    public String edit(){
        return "editRole";
    }

    /**
     * 查询所有规则
     * @return
     */
    @ResponseBody
    @RequestMapping("/queryAll")
    public String queryAllKnowledge(){
       List<Knowledge> list =  knowledgeService.queryAllKnowledge();
        return JSON.toJSONString(list);
    }


    /**
     * 添加新规则
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/saveKnowledge", method = RequestMethod.POST)
    public Integer saveKnowledge(HttpServletRequest request){
        String data = request.getParameter("data");
        System.out.println(data);
        Knowledge knowledge = new Knowledge();
        Set<Ruler> rulers = new HashSet<>();
        JSONObject ob=JSON.parseObject(data);
        knowledge.setName(ob.getString("name"));
        knowledge.setDescribe(ob.getString("describe"));
        knowledge.setHotWord(ob.getString("hotWord"));
        knowledge.setDepartment(ob.getString("department"));
        knowledge.setOperator(ob.getString("operator"));
        knowledge.setOperTime(new Date());
        JSONArray jsonArray=(JSONArray) ob.get("rulers");
        JSONObject row;
        for (int i = 0; i < jsonArray.size(); i++) {
            Ruler ruler = new Ruler();
            row = jsonArray.getJSONObject(i);
            ruler.setColumn(row.getString("column"));
            ruler.setValue(row.getString("value"));
            rulers.add(ruler);
        }
        knowledge.setRulers(rulers);
        int index =  knowledgeService.saveKnowledge(knowledge);
        return index;
    }

    /**
     * 更新规则
     * @param data
     * @return
     */
    @ResponseBody
    @RequestMapping("/updateKnowledge")
    public Integer updateKnowledge(String data){
        Knowledge knowledge = new Knowledge();
        Set<Ruler> rulers = new HashSet<>();
        JSONObject ob=JSON.parseObject(data);
        knowledge.setId(ob.getInteger("id"));
        knowledge.setName(ob.getString("name"));
        knowledge.setDescribe(ob.getString("describe"));
        knowledge.setHotWord(ob.getString("hotWord"));
        knowledge.setDepartment(ob.getString("department"));
        knowledge.setOperator(ob.getString("operator"));
        knowledge.setOperTime(new Date());
        JSONArray jsonArray=(JSONArray) ob.get("rulers");
        JSONObject row;
        for (int i = 0; i < jsonArray.size(); i++) {
            Ruler ruler = new Ruler();
            row = jsonArray.getJSONObject(i);
            ruler.setId(row.getInteger("id"));
            ruler.setColumn(row.getString("column"));
            ruler.setValue(row.getString("value"));
            rulers.add(ruler);
        }
        knowledge.setRulers(rulers);
        int index =  knowledgeService.updateKnowledge(knowledge);
        return index;
    }

    /**
     * 查询某一条规则
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/queryKnowledge")
    public String queryKnowledgeById(int id){
        Knowledge knowledge = knowledgeService.queryKnowledgeById(id);
        return JSON.toJSONString(knowledge);
    }

    /**
     * 删除某一条规则
     * @param id
     */
    @ResponseBody
    @RequestMapping("/deleteKnowledge")
    public void deleteKnowledge(int id){
        knowledgeService.deleteKnowledge(id);
    }

    /**
     * 分页查询规则
     * @param page
     * @param size
     * @return
     */
    @ResponseBody
    @RequestMapping("/queryKnowledgeByPage")
    public Page<Knowledge> queryKnowledgeByPage(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                      @RequestParam(value = "size", defaultValue = "5") Integer size){
        return knowledgeService.queryKnowledgeByPage(page, size);
    }

    /**
     * 模糊查询规则
     * @param name
     * @param page
     * @param size
     * @param sorts
     * @return
     */
    @ResponseBody
    @RequestMapping("/searchByName")
    public Page<Knowledge> findByName(@RequestParam(value = "name") String name,
                                      @RequestParam(value = "page", defaultValue = "0") Integer page,
                                      @RequestParam(value = "size", defaultValue = "5") Integer size,
                                      @RequestParam(value = "sorts", defaultValue = "id") String sorts){
        Sort sort = new Sort(Sort.Direction.ASC, sorts);
        Pageable pageable =new PageRequest(page,size,sort);
       return knowledgeService.findByName(name, pageable);
    }
}
