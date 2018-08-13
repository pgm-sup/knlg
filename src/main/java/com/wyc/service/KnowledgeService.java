package com.wyc.service;

import com.wyc.entity.Knowledge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author pgm_sup
 */
public interface KnowledgeService {

    List<Knowledge> queryAllKnowledge();

    int saveKnowledge(Knowledge knowledge);

    int updateKnowledge(Knowledge knowledge);

    void deleteKnowledge(int id);

    Knowledge queryKnowledgeById(int id);

    Page<Knowledge> queryKnowledgeByPage(Integer page, Integer pageSize);

    Page<Knowledge> findByName(String name, Pageable pageable);
}
