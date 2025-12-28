package com.example.demo.repository;

import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Model.
 * <p>
 * Tương tác với bảng models trong cơ sở dữ liệu.
 */
@Repository
public interface ModelRepository extends IRepository<Model, Long> {
}
