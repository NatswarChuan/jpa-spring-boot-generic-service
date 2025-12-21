package com.natswarchuan.genericservice.service;

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

/**
 * Lớp trừu tượng triển khai các thao tác đọc danh sách (Read Summary).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
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
    public List<E> findAll() {
        return repository.findAll();
    }

    /** {@inheritDoc} */
    @Override
    public List<E> findAllById(@NonNull Collection<ID> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }
        return repository.findAllById(ids);
    }

    /** {@inheritDoc} */
    @Override
    public List<E> findAll(Specification<E> spec) {
        return specExecutor.findAll(spec);
    }

    /** {@inheritDoc} */
    @Override
    public long count(Specification<E> spec) {
        return specExecutor.count(spec);
    }

    /** {@inheritDoc} */
    @Override
    public Page<E> findAll(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        return repository.findAll(paging);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<E> findAll(@NonNull Pageable pageable, @NonNull Specification<E> spec) {
        return specExecutor.findAll(spec, pageable);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> List<S> findAll(@NonNull Class<S> dtoClass) {
        List<E> data = repository.findAll();
        return data.stream()
                .map(e -> mapToDto(e, dtoClass))
                .collect(Collectors.toList());
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> List<S> findAll(@NonNull Class<S> dtoClass, String language) {
        List<E> entities = repository.findAll();
        return entities.stream()
                .map(entity -> mapToDto(entity, dtoClass, language))
                .collect(Collectors.toList());
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> List<S> findAllById(@NonNull Collection<ID> ids, @NonNull Class<S> dtoClass) {
        return findAllById(ids, dtoClass, null);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass, String language) {
        List<E> entities = repository.findAllById(ids);
        return entities.stream()
                .map(entity -> mapToDto(entity, dtoClass, language))
                .collect(Collectors.toList());
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> List<S> findAll(@NonNull Class<S> dtoClass, @NonNull Specification<E> spec) {
        List<E> entities = specExecutor.findAll(spec);
        return entities.stream()
                .map(entity -> mapToDto(entity, dtoClass))
                .collect(Collectors.toList());
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(int page, int size, @NonNull Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = repository.findAll(paging);
        return entityPage.map(entity -> mapToDto(entity, dtoClass));
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(int page, int size, @NonNull Class<S> dtoClass, String language) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = repository.findAll(paging);
        return entityPage.map(entity -> mapToDto(entity, dtoClass, language));
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = specExecutor.findAll(spec, paging);
        return entityPage.map(entity -> mapToDto(entity, dtoClass));
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass,
            String language) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = specExecutor.findAll(spec, paging);
        return entityPage.map(entity -> mapToDto(entity, dtoClass, language));
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(Pageable pageable, Specification<E> spec, Class<S> dtoClass) {
        Page<E> entityPage = specExecutor.findAll(spec, pageable);
        return entityPage.map(entity -> mapToDto(entity, dtoClass));
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> Page<S> findAll(@NonNull Pageable paging, @NonNull Specification<E> spec,
            @NonNull Class<S> dtoClass, String languageCode) {
        Page<E> entityPage = specExecutor.findAll(spec, paging);
        return entityPage.map(entity -> mapToDto(entity, dtoClass, languageCode));
    }
}
