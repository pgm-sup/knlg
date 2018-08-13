package com.wyc.service.impl;

import com.wyc.dao.KnowledgeDao;
import com.wyc.entity.Knowledge;
import com.wyc.service.KnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author pgm_sup
 */
@Service
public class KnowledgeServiceImpl implements KnowledgeService {

    @Autowired
    private KnowledgeDao knowledgeDao;
    @Override
    public List<Knowledge> queryAllKnowledge() {
        return  knowledgeDao.findAll();
    }

    @Override
    public int saveKnowledge(Knowledge knowledge) {
        return knowledgeDao.save(knowledge).getId();
    }

    @Override
    public int updateKnowledge(Knowledge knowledge) {
        return knowledgeDao.save(knowledge).getId();
    }

    @Override
    public void deleteKnowledge(int id) {
        knowledgeDao.delete(id);
    }

    @Override
    public Knowledge queryKnowledgeById(int id) {
        return knowledgeDao.findOne(id);
    }

    @Override
    public Page<Knowledge> queryKnowledgeByPage(Integer page, Integer pageSize) {
        Pageable pageable = new PageRequest(page, pageSize, Sort.Direction.ASC, "id");
        return knowledgeDao.findAll(pageable);
    }

    @Override
    public Page<Knowledge> findByName(String name, Pageable pageable) {
        return knowledgeDao.findByNameLike("%"+name+"%", pageable);
    }
}
