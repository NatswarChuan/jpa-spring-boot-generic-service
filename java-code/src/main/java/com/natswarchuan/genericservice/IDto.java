package com.natswarchuan.genericservice;

/**
 * Giao diện đại diện cho một DTO (Data Transfer Object).
 *
 * @param <E> Kiểu dữ liệu của entity tương ứng với DTO.
 * @author NatswarChuan
 */
public interface IDto<E> {

  /**
   * Chuyển đổi DTO thành entity.
   *
   * <p>Mặc định, phương thức này sẽ ném {@link UnsupportedOperationException}. Các lớp DTO cụ thể
   * cần hỗ trợ chuyển đổi này phải override phương thức này.
   *
   * @return Entity tương ứng với DTO.
   * @throws UnsupportedOperationException nếu thao tác này không được hỗ trợ.
   */
  default E toEntity() {
    throw new UnsupportedOperationException(
        "Chuyển đổi từ DTO sang Entity không được hỗ trợ cho lớp này.");
  }

  /**
   * Chuyển đổi entity thành DTO.
   *
   * <p>Mặc định, phương thức này sẽ ném {@link UnsupportedOperationException}. Các lớp DTO cụ thể
   * cần hỗ trợ chuyển đổi này (ví dụ: để điền dữ liệu từ entity vào DTO) phải override phương thức
   * này.
   *
   * @param entity Entity cần chuyển đổi thành DTO.
   * @throws UnsupportedOperationException nếu thao tác này không được hỗ trợ.
   */
  default void fromEntity(E entity) {
    throw new UnsupportedOperationException(
        "Chuyển đổi từ Entity sang DTO không được hỗ trợ cho lớp này.");
  }

  /**
   * Cập nhật một thực thể (entity) đã có từ dữ liệu của DTO này.
   *
   * <p>Phương thức này thường được sử dụng trong các thao tác cập nhật, nơi một thực thể được tải
   * từ cơ sở dữ liệu và sau đó các trường của nó được cập nhật bằng dữ liệu từ DTO.
   *
   * <p>Mặc định, phương thức này sẽ ném {@link UnsupportedOperationException}. Các lớp DTO cụ thể
   * cần hỗ trợ cập nhật thực thể phải ghi đè phương thức này.
   *
   * @param entity Thực thể hiện có cần được cập nhật.
   * @return Thực thể đã được cập nhật.
   * @throws UnsupportedOperationException nếu thao tác này không được hỗ trợ.
   */
  default E updateEntity(E entity) {
    throw new UnsupportedOperationException(
        "Cập nhật Entity từ DTO không được hỗ trợ cho lớp này.");
  }

  /**
   * Chuyển đổi entity thành DTO, có hỗ trợ đa ngôn ngữ.
   *
   * <p>Phương thức này điền dữ liệu từ một entity vào DTO, ưu tiên các trường dữ liệu tương ứng với
   * mã ngôn ngữ được cung cấp.
   *
   * @param entity Entity chứa dữ liệu nguồn.
   * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu phù hợp.
   */
  default void fromEntity(E entity, String language) {
    fromEntity(entity);
  }
}
