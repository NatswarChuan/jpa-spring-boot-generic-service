package com.natswarchuan.genericservice.controller.trait;

import com.natswarchuan.genericservice.service.trait.IService;

/**
 * Interface cơ sở cho các controller trait.
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu ID.
 * @author NatswarChuan
 */
public interface IBaseController<E, ID> {
  /**
   * Lấy service xử lý nghiệp vụ.
   * 
   * @return Service implement {@link IService}.
   */
  IService<E, ID> getService();
}
