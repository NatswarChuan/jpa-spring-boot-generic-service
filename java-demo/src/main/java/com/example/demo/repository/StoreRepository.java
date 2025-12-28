package com.example.demo.repository;

import com.example.demo.domain.Store;
import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Store.
 * <p>
 * Quản lý dữ liệu cửa hàng.
 */
@Repository
public interface StoreRepository extends IRepository<Store, Long> {
}
