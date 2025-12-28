package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

/**
 * Giao diện dịch vụ cho các thao tác đọc danh sách (Read Summary).
 * <p>
 * Cung cấp các phương thức để truy vấn danh sách thực thể, đếm số lượng, phân
 * trang, và chuyển đổi kết quả sang DTO.
 * Hỗ trợ các hook {@link #afterReadEntity(List)} và {@link #afterReadDto(List)}
 * để xử lý dữ liệu sau khi đọc.
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IReadSummaryService<E, ID> extends IBaseService<E, ID> {

        /**
         * Lấy danh sách tất cả các thực thể hiện có.
         * <p>
         * Kết quả sẽ được xử lý qua hook {@link #afterReadEntity(List)}.
         *
         * @return Danh sách tất cả các thực thể.
         */
        @Transactional(readOnly = true)
        default List<E> findAll() {
                return afterReadEntity(getRepository().findAll());
        }

        /**
         * Tìm kiếm danh sách thực thể dựa trên danh sách ID cung cấp.
         *
         * @param ids Tập hợp các ID cần tìm. Nếu null hoặc rỗng sẽ trả về danh sách
         *            rỗng.
         * @return Danh sách các thực thể tìm thấy.
         */
        @Transactional(readOnly = true)
        default List<E> findAllById(Collection<ID> ids) {
                if (ids == null || ids.isEmpty()) {
                        return Collections.emptyList();
                }
                return afterReadEntity(getRepository().findAllById(ids));
        }

        /**
         * Tìm kiếm danh sách thực thể thỏa mãn tiêu chí lọc (Specification).
         *
         * @param spec Tiêu chí tìm kiếm.
         * @return Danh sách các thực thể phù hợp.
         */

        @Transactional(readOnly = true)
        default List<E> findAll(Specification<E> spec) {
                return afterReadEntity(getRepository().findAll(spec));
        }

        /**
         * Đếm tổng số lượng thực thể thỏa mãn tiêu chí lọc.
         *
         * @param spec Tiêu chí tìm kiếm.
         * @return Số lượng thực thể.
         */

        @Transactional(readOnly = true)
        default long count(Specification<E> spec) {
                return getRepository().count(spec);
        }

        /**
         * Lấy danh sách thực thể có phân trang.
         *
         * @param page Số thứ tự trang (bắt đầu từ 0).
         * @param size Số lượng phần tử tối đa trên mỗi trang.
         * @return Đối tượng {@link Page} chứa danh sách thực thể của trang yêu cầu.
         */
        @Transactional(readOnly = true)
        default Page<E> findAll(int page, int size) {
                Pageable paging = PageRequest.of(page, size);
                return afterReadEntity(getRepository().findAll(paging));
        }

        /**
         * Lấy danh sách thực thể phân trang kết hợp điều kiện lọc.
         *
         * @param <S>      Tham số kiểu không sử dụng (giữ lại để tương thích ngược).
         * @param pageable Thông tin phân trang (số trang, kích thước, sắp xếp).
         * @param spec     Tiêu chí tìm kiếm.
         * @return Đối tượng {@link Page} chứa danh sách thực thể phù hợp.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<E> findAll(Pageable pageable, Specification<E> spec) {
                if (pageable == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Pageable không được xác định");
                }
                return afterReadEntity(getRepository().findAll(spec, pageable));
        }

        /**
         * Lấy tất cả thực thể và chuyển đổi sang danh sách DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param dtoClass Lớp DTO đích.
         * @return Danh sách đối tượng DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> List<S> findAll(Class<S> dtoClass) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                List<E> data = afterReadEntity(getRepository().findAll());
                if (data == null) {
                        return Collections.emptyList();
                }
                return afterReadDto(mapToDtos(data, dtoClass));
        }

        /**
         * Lấy tất cả thực thể và chuyển đổi sang danh sách DTO (có hỗ trợ đa ngôn ngữ).
         *
         * @param <S>      Kiểu DTO trả về.
         * @param dtoClass Lớp DTO đích.
         * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
         * @return Danh sách đối tượng DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, String language) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                List<E> entities = afterReadEntity(getRepository().findAll());
                if (entities == null) {
                        return Collections.emptyList();
                }
                return afterReadDto(mapToDtos(entities, dtoClass, language));
        }

        /**
         * Lấy danh sách thực thể theo ID và chuyển đổi sang DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param ids      Danh sách ID cần tìm.
         * @param dtoClass Lớp DTO đích.
         * @return Danh sách đối tượng DTO.
         */
        @Transactional(readOnly = true)
        default <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass) {
                return findAllById(ids, dtoClass, null);
        }

        /**
         * Lấy danh sách thực thể theo ID và chuyển đổi sang DTO (có hỗ trợ đa ngôn
         * ngữ).
         *
         * @param <S>      Kiểu DTO trả về.
         * @param ids      Danh sách ID cần tìm.
         * @param dtoClass Lớp DTO đích.
         * @param language Mã ngôn ngữ.
         * @return Danh sách đối tượng DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass, String language) {
                if (ids == null || ids.isEmpty()) {
                        return Collections.emptyList();
                }
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                List<E> entities = afterReadEntity(getRepository().findAllById(ids));
                if (entities == null) {
                        return Collections.emptyList();
                }
                return afterReadDto(mapToDtos(entities, dtoClass, language));
        }

        /**
         * Tìm kiếm thực thể theo tiêu chí và chuyển đổi sang danh sách DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param dtoClass Lớp DTO đích.
         * @param spec     Tiêu chí tìm kiếm.
         * @return Danh sách đối tượng DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, Specification<E> spec) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                List<E> entities = afterReadEntity(getRepository().findAll(spec));
                if (entities == null) {
                        return Collections.emptyList();
                }
                return afterReadDto(mapToDtos(entities, dtoClass));
        }

        /**
         * Lấy danh sách thực thể phân trang và chuyển đổi sang trang DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param page     Số thứ tự trang.
         * @param size     Kích thước trang.
         * @param dtoClass Lớp DTO đích.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                Pageable paging = PageRequest.of(page, size);
                Page<E> entityPage = afterReadEntity(getRepository().findAll(paging));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass));
        }

        /**
         * Lấy danh sách thực thể phân trang và chuyển đổi sang trang DTO (có hỗ trợ đa
         * ngôn ngữ).
         *
         * @param <S>      Kiểu DTO trả về.
         * @param page     Số thứ tự trang.
         * @param size     Kích thước trang.
         * @param dtoClass Lớp DTO đích.
         * @param language Mã ngôn ngữ.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass, String language) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                Pageable paging = PageRequest.of(page, size);
                Page<E> entityPage = afterReadEntity(getRepository().findAll(paging));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass, language));
        }

        /**
         * Lấy danh sách thực thể phân trang theo tiêu chí và chuyển đổi sang trang DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param page     Số thứ tự trang.
         * @param size     Kích thước trang.
         * @param spec     Tiêu chí tìm kiếm.
         * @param dtoClass Lớp DTO đích.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                Pageable paging = PageRequest.of(page, size);
                Page<E> entityPage = afterReadEntity(getRepository().findAll(spec, paging));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass));
        }

        /**
         * Lấy danh sách thực thể phân trang theo tiêu chí và chuyển đổi sang trang DTO
         * (có hỗ trợ đa ngôn ngữ).
         *
         * @param <S>      Kiểu DTO trả về.
         * @param page     Số thứ tự trang.
         * @param size     Kích thước trang.
         * @param spec     Tiêu chí tìm kiếm.
         * @param dtoClass Lớp DTO đích.
         * @param language Mã ngôn ngữ.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass,
                        String language) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                Pageable paging = PageRequest.of(page, size);
                Page<E> entityPage = afterReadEntity(getRepository().findAll(spec, paging));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass, language));
        }

        /**
         * Lấy danh sách thực thể phân trang (dùng Pageable) theo tiêu chí và chuyển đổi
         * sang trang DTO.
         *
         * @param <S>      Kiểu DTO trả về.
         * @param pageable Thông tin phân trang.
         * @param spec     Tiêu chí tìm kiếm.
         * @param dtoClass Lớp DTO đích.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(Pageable pageable, Specification<E> spec, Class<S> dtoClass) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                if (pageable == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Pageable không được xác định");
                }
                Page<E> entityPage = afterReadEntity(getRepository().findAll(spec, pageable));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass));
        }

        /**
         * Lấy danh sách thực thể phân trang (dùng Pageable) theo tiêu chí và chuyển đổi
         * sang trang DTO (có hỗ trợ đa ngôn ngữ).
         *
         * @param <S>          Kiểu DTO trả về.
         * @param paging       Thông tin phân trang.
         * @param spec         Tiêu chí tìm kiếm.
         * @param dtoClass     Lớp DTO đích.
         * @param languageCode Mã ngôn ngữ.
         * @return Đối tượng {@link Page} chứa danh sách DTO.
         */

        @Transactional(readOnly = true)
        default <S extends IDto<E>> Page<S> findAll(Pageable paging, Specification<E> spec,
                        Class<S> dtoClass, String languageCode) {
                if (dtoClass == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO không được xác định");
                }
                if (paging == null) {
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Pageable không được xác định");
                }
                Page<E> entityPage = afterReadEntity(getRepository().findAll(spec, paging));
                if (entityPage == null) {
                        return Page.empty();
                }
                return afterReadDto(mapToDtos(entityPage, dtoClass, languageCode));
        }

        /**
         * Hook được gọi sau khi đọc danh sách thực thể từ DB.
         * <p>
         * Có thể ghi đè để xử lý hoặc lọc thêm danh sách thực thể trước khi trả về.
         *
         * @param entities Danh sách thực thể đã đọc.
         * @return Danh sách thực thể sau khi xử lý (thường là chính danh sách đó).
         */
        default List<E> afterReadEntity(List<E> entities) {
                return entities;
        }

        /**
         * Hook được gọi sau khi đọc trang thực thể từ DB.
         * <p>
         * Có thể ghi đè để xử lý dữ liệu trong trang trước khi trả về.
         *
         * @param page Trang thực thể đã đọc.
         * @return Trang thực thể sau khi xử lý (thường là chính trang đó).
         */
        default Page<E> afterReadEntity(Page<E> page) {
                return page;
        }

        /**
         * Hook được gọi sau khi chuyển đổi danh sách thực thể sang danh sách DTO.
         * <p>
         * Có thể ghi đè để bổ sung dữ liệu tính toán hoặc thông tin phụ cho các DTO.
         *
         * @param dtos Danh sách DTO.
         * @param <S>  Kiểu DTO.
         * @return Danh sách DTO sau khi xử lý (thường là chính danh sách đó).
         */
        default <S extends IDto<E>> List<S> afterReadDto(List<S> dtos) {
                return dtos;
        }

        /**
         * Hook được gọi sau khi chuyển đổi trang thực thể sang trang DTO.
         *
         * @param page Trang DTO.
         * @param <S>  Kiểu DTO.
         * @return Trang DTO sau khi xử lý (thường là chính trang đó).
         */
        default <S extends IDto<E>> Page<S> afterReadDto(Page<S> page) {
                return page;
        }
}
