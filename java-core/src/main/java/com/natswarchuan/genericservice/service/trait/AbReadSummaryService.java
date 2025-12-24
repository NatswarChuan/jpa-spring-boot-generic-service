package com.natswarchuan.genericservice.service.trait;

import com.natswarchuan.genericservice.dto.IDto;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lớp trừu tượng triển khai các thao tác đọc danh sách (Read Summary).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
@SuppressWarnings("null")
public abstract class AbReadSummaryService<E, ID> extends AbBaseService<E, ID> implements IReadSummaryService<E, ID> {

    /**
     * Khởi tạo với repository truyền vào.
     *
     * @param repository Repository của thực thể.
     * @param <R>        Kiểu repository.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbReadSummaryService(
            @NonNull R repository) {
        super(repository);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public List<E> findAll() {
        return afterReadEntity(repository.findAll());
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public List<E> findAllById(Collection<ID> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }
        return afterReadEntity(repository.findAllById(ids));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public List<E> findAll(Specification<E> spec) {
        return afterReadEntity(specExecutor.findAll(spec));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public long count(Specification<E> spec) {
        return specExecutor.count(spec);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public Page<E> findAll(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        return afterReadEntity(repository.findAll(paging));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<E> findAll(Pageable pageable, Specification<E> spec) {
        return afterReadEntity(specExecutor.findAll(spec, pageable));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass) {
        List<E> data = afterReadEntity(repository.findAll());
        return afterReadDto(data.stream()
                .map(e -> mapToDto(e, dtoClass))
                .collect(Collectors.toList()));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, String language) {
        List<E> entities = afterReadEntity(repository.findAll());
        return afterReadDto(entities.stream()
                .map(entity -> mapToDto(entity, dtoClass, language))
                .collect(Collectors.toList()));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass) {
        return findAllById(ids, dtoClass, null);
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass, String language) {
        List<E> entities = afterReadEntity(repository.findAllById(ids));
        return afterReadDto(entities.stream()
                .map(entity -> mapToDto(entity, dtoClass, language))
                .collect(Collectors.toList()));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, Specification<E> spec) {
        List<E> entities = afterReadEntity(specExecutor.findAll(spec));
        return afterReadDto(entities.stream()
                .map(entity -> mapToDto(entity, dtoClass))
                .collect(Collectors.toList()));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = afterReadEntity(repository.findAll(paging));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass)));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass, String language) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = afterReadEntity(repository.findAll(paging));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass, language)));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = afterReadEntity(specExecutor.findAll(spec, paging));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass)));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass,
            String language) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = afterReadEntity(specExecutor.findAll(spec, paging));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass, language)));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(Pageable pageable, Specification<E> spec, Class<S> dtoClass) {
        Page<E> entityPage = afterReadEntity(specExecutor.findAll(spec, pageable));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass)));
    }

    /** {@inheritDoc} */
    @Override
    @Transactional(readOnly = true)
    public <S extends IDto<E>> Page<S> findAll(Pageable paging, Specification<E> spec,
            Class<S> dtoClass, String languageCode) {
        Page<E> entityPage = afterReadEntity(specExecutor.findAll(spec, paging));
        return afterReadDto(entityPage.map(entity -> mapToDto(entity, dtoClass, languageCode)));
    }

    /**
     * Hook được gọi sau khi đọc danh sách thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entities Danh sách thực thể đã đọc.
     * @return Danh sách thực thể sau khi xử lý.
     */
    protected List<E> afterReadEntity(List<E> entities) {
        return entities;
    }

    /**
     * Hook được gọi sau khi đọc trang thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param page Trang thực thể đã đọc.
     * @return Trang thực thể sau khi xử lý.
     */
    protected Page<E> afterReadEntity(Page<E> page) {
        return page;
    }

    /**
     * Hook được gọi sau khi chuyển đổi sang danh sách DTO.
     *
     * @param dtos Danh sách DTO.
     * @param <S>  Kiểu DTO.
     * @return Danh sách DTO sau khi xử lý.
     */
    protected <S extends IDto<E>> List<S> afterReadDto(List<S> dtos) {
        return dtos;
    }

    /**
     * Hook được gọi sau khi chuyển đổi sang trang DTO.
     *
     * @param page Trang DTO.
     * @param <S>  Kiểu DTO.
     * @return Trang DTO sau khi xử lý.
     */
    protected <S extends IDto<E>> Page<S> afterReadDto(Page<S> page) {
        return page;
    }
}
